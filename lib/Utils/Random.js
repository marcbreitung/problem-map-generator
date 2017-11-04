export class Random {
    static getBetweenMinMax(min, max) {
        let minCeil = Math.ceil(min),
            maxFloor = Math.floor(max);
        return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil;
    }
}