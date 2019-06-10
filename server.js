var KMeansclustering = require('./src/kMeansClustering')

var kmeans = new KMeansclustering();
var randomArray = (length, max) => [...new Array(length)]
    .map(() => Math.round(Math.random() * max));
var array = randomArray(20, 100)
console.log("data ", array)

kmeans.train(array,3);
var result = kmeans.predict(15);
console.log("value 3 result == predict", result)
