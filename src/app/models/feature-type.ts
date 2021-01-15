import { Feature } from "./feature";

export class FeatureType {
    features: Feature[] = [];

    constructor(private name: string, 
                private canSelectManyFeatures: boolean, 
                featureMap: { [key: string]: Feature }) {
        for (var featureId in featureMap) {
            var feature = featureMap[featureId];
            this.features.push( { key: featureId, ...feature } );
        }
    }
}