
export interface FeatureType {
    key: string, 
    name: string,
    question: string, // question to user if he needs to choose some feature from this category
                      // used in dialog with user
    canSelectManyFeatures: boolean, // true - rendering checkboxes, false - radio buttons
    features: { 
        [featureKey: string]: { 
            answer: string, 
            name: string 
        } 
    }


}
