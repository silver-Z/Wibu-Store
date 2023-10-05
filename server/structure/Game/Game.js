const { execQuery, execGetQuery, execSetQuery, strToJSON, convertPath2IMG } = require("../../support");
const { Company } = require("../Company/Company");
const { Type } = require("../Type/Type");
const { User } = require("../User/User");

class Game {
    // +++ ------ Meta data ------ +++ //
    // private fields
    #gameID;
    #condition;
    #tableName = 'games';

    #metaDataFields = ["id", "title", "types", "developers", "publisher", "description", "release_date", "size", "cover_img"];
    #storeRelatedDataFields = ["reviews", "original_price", "price", "background_img"];

    // constructor
    constructor(gameID) {
        this.#gameID = gameID;
        this.#condition = `id=${this.#gameID}`;
    }



    // Game ID
    getGameID() {
        return this.#gameID;
    }

    // title
    async getTitle() {
        const getField = 'title';
        try {
            const result = await execGetQuery(this.#tableName, getField, this.#condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async setTitle(newTitle) {
        const setStatement = `title='${newTitle}'`;
        try {
            const result = await execSetQuery(this.#tableName, setStatement, this.#condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // types
    async getTypes() {
        const getField = 'types';
        try {
            const result = await execGetQuery(this.#tableName, getField, this.#condition);
            return result.split(', ');
        } catch (error) {
            throw error;
        }
    }

    async setTypes(types) {
        var newTypes;

        if (typeof types === "string") newTypes = types;
        else newTypes = types.join(', ');

        const setStatement = `types='${newTypes}'`;
        try {
            const result = await execSetQuery(this.#tableName, setStatement, this.#condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async addTypes(newTypes) {
        try {
            const oldtypes = await this.getTypes();
            const types = [...new Set([...oldtypes, ...newTypes])];

            const result = await this.setTypes(types);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async removeTypes(removedTypes) {
        try {
            const oldtypes = await this.getTypes();
            removedTypes.forEach(genre => {
                oldtypes.splice(oldtypes.indexOf(genre), 1);
            })
            const types = this.setTypes(oldtypes);
            return types;
        } catch (error) {
            throw error;
        }
    }

    // developers
    async getDevelopers() {
        const getField = 'developers';
        try {
            const result = await execGetQuery(this.#tableName, getField, this.#condition);
            return result.split(', ');
        } catch (error) {
            throw error;
        }
    }

    async setDevelopers(developers) {
        var newDevelopers;

        if (typeof developers === "string") newDevelopers = developers;
        else newDevelopers = developers.join(', ');
        
        const setStatement = `developers='${newDevelopers}'`;
        try {
            const result = await execSetQuery(this.#tableName, setStatement, this.#condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async addDevelopers(newDevelopers) {
        try {
            const oldDevs = await this.getDevelopers();
            const devs = [...new Set([...oldDevs, ...newDevelopers])];

            const result = await this.setDevelopers(devs);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async removeDevelopers(removedDevelopers) {
        try {
            const oldDevs = await this.getDevelopers();
            removedDevelopers.forEach(dev => {
                oldDevs.splice(oldDevs.indexOf(dev), 1);
            })
            const devs = this.setDevelopers(oldDevs);
            return devs;
        } catch (error) {
            throw error;
        }
    }

    // publisher
    async getPublisher() {
        const getField = 'publisher';
        try {
            const result = await execGetQuery(this.#tableName, getField, this.#condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async setPublisher(newPublisher) {
        const setStatement = `publisher='${newPublisher}'`;
        try {
            const result = await execSetQuery(this.#tableName, setStatement, this.#condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // description
    async getDescription() {
        const getField = 'description';
        try {
            const result = await execGetQuery(this.#tableName, getField, this.#condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async setDescription(newDescription) {
        const setStatement = `description='${newDescription}'`;
        try {
            const result = await execSetQuery(this.#tableName, setStatement, this.#condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // release date
    async getReleaseDate() {
        const getField = 'release_date';
        try {
            const result = await execGetQuery(this.#tableName, getField, this.#condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async setReleaseDate(newReleaseDate) {
        const setStatement = `release_date='${newReleaseDate}'`;
        try {
            const result = await execSetQuery(this.#tableName, setStatement, this.#condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getCoverImage() {
        const getField = 'cover_img_url';
        try {
            const result = await execGetQuery(this.#tableName, getField, this.#condition);
            if (result.length !==0) {
                return convertPath2IMG(`cover_imgs/${result[0].cover_img_url}`);
            } else return null;
        } catch (error) {
            throw error;
        }
    }

    // meta data && store related information
    async getFullMetaData() {
        const query = `SELECT * FROM ${this.#tableName} WHERE ${this.#condition}`;
        try {
            const result = await execQuery(query);
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    // +++ ------ Meta data ------ +++ //
    

    
    // +++ ------ Store-related data ------ ++ //
    #storeRelatedIn4TableName = 'gameStoreRelatedIn4';

    async getFullStoreRelatedData() {
        const query = `SELECT * FROM ${this.#storeRelatedIn4TableName} WHERE ${this.#condition}`;
        try {
            const result = await execQuery(query);
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    async #getStoreRelatedData(getField) {
        try {
            let result;
            if (getField === "background_img") {
                // result = await this.getBackgroundImage();
                // return result;
            } else {
                result = await execGetQuery(this.#storeRelatedIn4TableName, getField, this.#condition);
                if (result.length !== 0) return result[0][getField];
                else return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async #setStoreRelatedData(setStatement) {
        try {
            const result = await execSetQuery(this.#storeRelatedIn4TableName, setStatement, this.#condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // reviews
    async getReviews() {
        const getField = 'reviews';
        try {
            const result = await this.#getStoreRelatedData(getField);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async setReviews(reviews) {
        const reviewsStr = JSON.stringify(reviews);
        const setStatement = `reviews=${reviewsStr}`;
        try {
            const result = await this.#setStoreRelatedData(setStatement);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async addReviews(newReviews) {
        try {
            const oldReviews = await this.getReviews();
            const reviews = [... new Set([...oldReviews, ...newReviews])];
            const result = await this.setReviews(reviews);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async removeReviews(removedReviews) {
        try {
            const oldReviews = await this.getReviews();
            removedReviews.forEach(review => {
                oldReviews.splice(oldReviews.indexOf(review), 1);
            })
            const reviews = this.setDevelopers(oldReviews);
            return reviews;
        } catch (error) {
            throw error;
        }
    }

    // original price
    async getOriginalPrice() {
        const getField = 'original_price';
        try {
            const result = await this.#getStoreRelatedData(getField);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async setOriginalPrice(newOriginalPrice) {
        const setStatement = `original_price=${newOriginalPrice}`;
        try {
            const result = await this.#setStoreRelatedData(setStatement);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // price
    async getPrice() {
        const getField = 'price';
        try {
            const result = await this.#getStoreRelatedData(getField);
            if (result !== null) return result;
            else {
                throw new Error("Game does not exists");
            }
        } catch (error) {
            throw error;
        }
    }

    async setPrice(newPrice) {
        const setStatement = `price=${newPrice}`;
        try {
            const result = await this.#setStoreRelatedData(setStatement);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // -------------------------- //
    async getFullData() {
        const metaData = await this.getFullMetaData();
        const storeRelatedData = await this.getFullStoreRelatedData();
        const fullData = {...metaData, ...storeRelatedData};

        fullData.types = strToJSON(fullData.types);
        fullData.developers = strToJSON(fullData.developers);
        fullData.reviews = strToJSON(fullData.reviews);

        const cover_img_url = `cover_imgs/game_${this.#gameID}.png`;
        const background_img_url = `background_imgs/game_${this.#gameID}.png`;

        const publisherID = fullData.publisher;
        const devIDs = fullData.developers;
        fullData.publisher = await new Company(publisherID).getName();
        fullData.developers = await Promise.all(devIDs.map(async devID => {
            const dev = await new Company(devID).getName();
            return dev;
        }));

        const typeIDs = fullData.types;
        fullData.types = await Promise.all(typeIDs.map(async typeID => {
            return await new Type(typeID).getTitle();
        }))

        fullData.cover_img = convertPath2IMG(cover_img_url);
        fullData.background_img = convertPath2IMG(background_img_url);

        

        fullData.avg_point = (fullData.reviews.length !== 0) ? fullData.reviews.reduce((accumulator, currentValue) => (accumulator + currentValue.point), 0) / fullData.reviews.length : 0;

        fullData.reviews = await Promise.all(fullData.reviews.map(async review => {
            review.reviewer = await new User(review.reviewer).getUsermame();
            return review;
        }))

        return fullData;
    }

    static async calculateOrderAmount(itemIDs) {
        try {
            const prices = await Promise.all(itemIDs.map(async (currentID) => {
                const currentAmount = await new Game(currentID).getPrice();
                return currentAmount;
            }));
    

            
            // Sum the prices using reduce
            const totalAmount = prices.reduce((accumulator, currentAmount) => {
                return accumulator + currentAmount;
            }, 0);
            


            return totalAmount;
        } catch (error) {
            throw error;
        }
    }

    async #getMetaData(getField) {
        try {
            let result;
            if (getField === "cover_img") {
                result = await this.getCoverImage();
                return result;
            } else {
                result = await execGetQuery(this.#tableName, getField, this.#condition);
                if (result.length !== 0) return result[0][getField];
                else return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async get(...fields) {
        const result = {};
        await Promise.all(fields.map(async field => {

            if (this.#metaDataFields.includes(field)) {
                result[field] = await this.#getMetaData(field);
            } else if (this.#storeRelatedDataFields.includes(field)) {
                result[field] = await this.#getStoreRelatedData(field);
            }
        }))
        return result;
    }
    
}

exports.Game = Game;