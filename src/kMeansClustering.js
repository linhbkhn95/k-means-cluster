class KmeansClustering {


    constructor() {
        this.data = {};
        this.k = 2;

    }
    initialResult() {

    }
    sum(array) {
        var s = 0;
        for (var i = 0; i < array.length; i++) {
            s += array[i]
        }
        return s
    }
    //training du lieu dau vao de tinh toan ra cac cluster du kien dau vao
    train(array, k = 2) {
        this.k = k;
        //initial data and centoid;
        var data = {};
        for (var i = 0; i < k; i++) {
            data[i] = {
                k: [],
                centroid: Math.ceil(this.sum(array) / array.length) * (i+1) / 3,
                temp: []
            }
        }
        while (true) {

            for (var i = 0; i < k; i++) {
                data[i].temp = []
            }
            for (var i = 0; i < array.length; i++) {
                let index = this.getCluster(data, array[i], k)
                data[index].temp.push(array[i])
            }
            //compare data for k set;
            this.showResult(data, k, 'temp')
            if (this.checkFinish(data, k)) {
                console.log('========================finish algorithm=============================')
                this.showResult(data, k)
                this.data = data;
                break;
            } else {
                for (var i = 0; i < k; i++) {
                    data[i].centroid = this.getCentoid(data[i].temp);
                    console.log('centroi ', i, data[i].centroid)
                    data[i].k = data[i].temp;
                }
            }
        }
    }
    //tinh lai gia tri centroid cua moi cluster
    getCentoid(array) {
        const s = this.sum(array)
        return (s / array.length).toFixed(2);
    }
    //check value xem thuoc cluster tra lai index cluster do
    getCluster(data, value, k) {
        var result = 0;
        var d = -1;
        for (var i = 0; i < k; i++) {

            var distance = Math.abs(data[i].centroid - value);
            if (d == -1) {
                d = distance;
            } else if (d > distance) {
                d = distance;
                result = i;
            }
        }
        return result;
    }
    //check xem gia tri thuoc cluster nao
    predict(value) {
        // console.log('predict',this.data)
        let index = this.getCluster(this.data, value, this.k)
        return {
            cluster: index,
            data: this.data[index].k
        }
    }
    //kiem tra da phan cum xong chua
    checkFinish(data, k) {
        for (var i = 0; i < k; i++) {
            if (!this.compareArray(data[i].k, data[i].temp)) {
                return false
            }
        }
        return true;
    }
    //so sanh 2 tap  xem co trung nhau k
    compareArray(array1, array2) {
        return JSON.stringify(array1) === JSON.stringify(array2)

    }
    showResult(data, k, type = 'k') {
        for (var i = 0; i < k; i++) {
            console.log('cluster ', i, '----', data[i][type])
        }
    }

}

module.exports = KmeansClustering;