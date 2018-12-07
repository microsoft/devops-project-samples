import pickle
import json
import numpy
from sklearn.externals import joblib
from sklearn.linear_model import Ridge
from azureml.core.model import Model
from surprise import Dataset, evaluate
from surprise import KNNBasic
import os
import urllib.request
import requests
import multiprocessing

def get_test_set():
    # manually downloading the file, as it requires a prompt otherwise
    url='http://files.grouplens.org/datasets/movielens/ml-100k.zip'
    DATASETS_DIR = os.path.expanduser('~') + '/.surprise_data/'

    print("Starting")
    name = 'ml-100k'
    os.makedirs(DATASETS_DIR, exist_ok=True)
    urllib.request.urlretrieve(url, DATASETS_DIR + 'tmp.zip')

    import zipfile
    with zipfile.ZipFile(DATASETS_DIR + 'tmp.zip', 'r') as tmp_zip:
        tmp_zip.extractall(DATASETS_DIR + name)

    data = Dataset.load_builtin(name)
    trainingSet = data.build_full_trainset()
    testSet = trainingSet.build_anti_testset()

    return testSet
    

def get_data(model, testSet):
    predictions = model.test(testSet)

    return predictions


from collections import defaultdict
 
def get_top3_recommendations(predictions, topN = 3):

    top_recs = defaultdict(list)
    for uid, iid, true_r, est, _ in predictions:
        top_recs[uid].append((iid, est))
     
    for uid, user_ratings in top_recs.items():
        user_ratings.sort(key = lambda x: x[1], reverse = True)
        top_recs[uid] = user_ratings[:topN]
     
    return top_recs

import os, io
 
def read_item_names():
    """Read the u.item file from MovieLens 100-k dataset and returns a
    mapping to convert raw ids into movie names.
    """
 
    file_name = (os.path.expanduser('~') +
                 '/.surprise_data/ml-100k/ml-100k/u.item')
    rid_to_name = {}
    with io.open(file_name, 'r', encoding='ISO-8859-1') as f:
        for line in f:
            line = line.split('|')
            rid_to_name[line[0]] = {'name': line[1],'image_url':  line[4]}
 
    return rid_to_name

def fetchVariationKey(uid):
    url = "https://optimizelyintegration.azurewebsites.net/azurepipelinesoptimizely/variation?uid=" + str(uid)
    restResponse =  requests.get(url)

    if (restResponse.ok):
        key = restResponse.content.decode('utf-8')
        print("Variation key assigned :" + str(key))
        return key
    else:
        print(restResponse.raise_for_status())
        return None

def top3_recommendations(modelName, modelFileName, test_set, q):
    
    print("Predicting corresponding to model : " + modelName)
    model_path = os.path.join(Model.get_model_path('outputs'), modelFileName) 
    model = joblib.load(model_path)
    predictions = get_data(model, test_set)
    print("Got predictions")
    top3_recommendations = get_top3_recommendations(predictions)
    q.put(top3_recommendations)
    print("Function ended")
    #modelRecommendationByName[modelName] = top3_recommendations

def init():
    global modelRecommendationByName
    global rid_to_name

    modelFileByName = {
        "modelA" : "model1.pkl",
        "modelB" : "model2.pkl",
        "modelC" : "model3.pkl"
    }

    modelRecommendationByName = {}


    test_set = get_test_set()
    threads = []
    q = multiprocessing.Queue()

    for modelName, modelFileName in modelFileByName.items():
        t = multiprocessing.Process(name=modelName, target=top3_recommendations, args=(modelName, modelFileName, test_set.copy(), q))
        t.start()
        threads.append(t)
    
    rid_to_name = read_item_names()
    for t in threads:
        modelRecommendationByName[t.name] = q.get()
        
    # Wait for all threads
    for thread in threads:
        print("In loop of join")
        thread.join()
        print("Join lopp over")

def run(raw_data):

    # data here is uid
    jsonData = json.loads(raw_data)
    userUid = jsonData['uid']

    # Integegration with optimizely
    # variationKey = azurePipelineOptimizelySdk.getVariationKey(userUid)
    variationKey = fetchVariationKey(userUid)
    if not variationKey:
        variationKey = "modelA" # list(modelRecommendationByName.keys())[0]
    top3_recommendations = modelRecommendationByName[variationKey]

    #data = numpy.array(data)
    result = None
    for uid, user_ratings in top3_recommendations.items():
        try:
            if str(uid) == str(userUid):
                suggestions = []
                for (iid, _) in user_ratings:
                    suggestions.append(rid_to_name[iid])
                
                result = {'uid': uid, 'variationKey': variationKey, 'suggestions': suggestions}
                break
        except Exception as e:
            result = str(e)
    return json.dumps({"result": result})
