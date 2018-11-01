var CosmosClient = require('@azure/cosmos').CosmosClient;
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('connectionData.json', 'utf8'));

var endpoint = obj.endpoint;
var masterKey = obj.primaryKey;

var HttpStatusCodes = { NOTFOUND: 404 };

var databaseId = obj.databaseId;
var containerId = obj.containerId;

var client = new CosmosClient({ endpoint: endpoint, auth: { masterKey: masterKey } });


module.exports = {
    /**
     * Create the database if it does not exist
     */
    createDatabase: async function () {
        const { database } = await client.databases.createIfNotExists({ id: databaseId });
        console.log(`Created database:\n${databaseId}\n`);
    },

    /**
     * Read the database definition
     */
    readDatabase: async function () {
        const { body: databaseDefinition } = await client.database(databaseId).read();
        console.log(`Reading database:\n${databaseDefinition.id}\n`);
    },

    /**
     * Create the container if it does not exist
     */
    createContainer: async function () {
        const { container } = await client.database(databaseId).containers.createIfNotExists({ id: containerId });
        console.log(`Created container:\n${containerId}\n`);
    },

    /**
     * Read the container definition
     */
    readContainer: async function () {
        const { body: containerDefinition } = await client.database(databaseId).container(containerId).read();
        console.log(`Reading container:\n${containerDefinition.id}\n`);
    },

    /**
     * Create item if it does not exist
     */
    createPageViewItem: async function (itemBody) {
        try {
            // read the item to see if it exists
            const { item } = await client.database(databaseId).container(containerId).item(itemBody.id).read();
            console.log(`Item with id ${itemBody.id} already exists\n`);
        }
        catch (error) {
            // create the item if it does not exist
            if (error.code === HttpStatusCodes.NOTFOUND) {
                const { item } = await client.database(databaseId).container(containerId).items.create(itemBody);
                console.log(`Created item with id:\n${itemBody.id}\n`);
            } else {
                throw error;
            }
        }
    },

    /**
     * Query the container using SQL
     */
    queryContainer: async function () {
        console.log(`Querying container:\n${containerId}`);

        // query to return count
        const querySpec = {
            query: "SELECT count(1) FROM c",
        };
        var { result: results } = await client.database(databaseId).container(containerId).items.query(querySpec).toArray();
        var res = results[0].$1;
        return res;
    },

    addRecord: async function(pageName){
        var milliseconds = (new Date).getTime().toString();
        var itemBody = {
            "id": milliseconds,
            "page": pageName
        };

        module.exports.createDatabase()
        .then(module.exports.createContainer())
        .then(module.exports.createPageViewItem(itemBody));
    }
}