from surprise import Dataset, evaluate
from surprise import KNNBasic
import zipfile
import os, io
import urllib.request
from sklearn.externals import joblib
from collections import defaultdict
from azureml.core.run import Run
import multiprocessing
 
def get_top3_recommendations(predictions, topN = 3):
     
    top_recs = defaultdict(list)
    for uid, iid, true_r, est, _ in predictions:
        top_recs[uid].append((iid, est))
     
    for uid, user_ratings in top_recs.items():
        user_ratings.sort(key = lambda x: x[1], reverse = True)
        top_recs[uid] = user_ratings[:topN]
     
    return top_recs
 
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
            rid_to_name[line[0]] = line[1]
 
    return rid_to_name

def executeTraining(modelFileName, simOptions):
    knn = KNNBasic(sim_options=sim_options, k=3)
    knn.train(trainingSet)
    testSet = trainingSet.build_anti_testset()
    predictions = knn.test(testSet)

    os.makedirs('./outputs', exist_ok=True)

    with open(modelFileName, "wb") as file:
        joblib.dump(knn, os.path.join('./outputs/', modelFileName))

run = Run.get_submitted_run()

# manually downloading the file, as it requires a prompt otherwise
url='http://files.grouplens.org/datasets/movielens/ml-100k.zip'
DATASETS_DIR = os.path.expanduser('~') + '/.surprise_data/'

print("Starting")

name = 'ml-100k'
os.makedirs(DATASETS_DIR, exist_ok=True)
urllib.request.urlretrieve(url, DATASETS_DIR + 'tmp.zip')

with zipfile.ZipFile(DATASETS_DIR + 'tmp.zip', 'r') as tmp_zip:
    tmp_zip.extractall(DATASETS_DIR + name)

data = Dataset.load_builtin(name)
trainingSet = data.build_full_trainset()

#############################################################################################################################
modelVariations={
    "model1.pkl": {
        'name': 'cosine',
        'user_based': False
    },
    "model2.pkl": {
        'name': 'cosine',
        'user_based': True
    },
    "model3.pkl": {
        'name': 'msd',
        'user_based': True
    }
}

threads = []

for modelFileName, sim_options in modelVariations.items():
    t = multiprocessing.Process(name=modelFileName, target=executeTraining, args=(modelFileName, sim_options))
    t.start()
    threads.append(t)
    
# Wait for all threads
for thread in threads:
    print("In loop of join")
    thread.join()
    print("Join lopp over")
