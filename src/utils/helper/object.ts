import { DropdownList } from "@/domain/model/etc";

export function convertObjectToFormData(object: { [key: string]: any }) {
    const formData = new FormData();
    Object.keys(object).forEach((key: string) => {
        if (object[key]) {

        }
        formData.append(key, object[key])
    });
    return formData;
}

export function convertFormDataToObject(object: FormData) {
    let newObject: any = {};
    for (var pair of object.entries()) {
        newObject[pair[0]] = pair[1];
    }
    return newObject;
}

export function consoleLogFormData(object: FormData) {
    for (var pair of object.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
}
export function declutterEmptyKeyValueInObject(object: { [key: string]: any }) {
    const declutteredObject = { ...object };
    Object.keys(declutteredObject).forEach((key: string) => {
        if (typeof declutteredObject[key] === "undefined" || declutteredObject[key] === null || declutteredObject[key] === "") {
            delete declutteredObject[key];
        }
    });
    return declutteredObject;
}

export const getFirstPathSegment = (pathname: string) => {
    const segments = pathname.split('/');
    return segments[0] === '' ? segments[1] : segments[0];
};

export function getDropDownValues<T>(data: T[], selector: string) {
    const uniqueArray = [...new Set(data.map((item: T) => item[selector]))]
    const noEmptyValues = uniqueArray.filter((element) => element !== "")
    const optionsArray = noEmptyValues.map(listItem => {
        return {
            value: listItem,
            label: listItem,
        };
    })
    return optionsArray
}

export function convertToDropdownListOptions(input: any[]): DropdownList[] {
    const optionsArray = input.map(item => {
        return {
            value: item,
            label: item,
        };
    })
    return optionsArray
}

export function convertObjectFieldToNumber(input: { [key: string]: any }, fields: string[]) {
    fields.forEach(field => {
        input[field] = Number(input[field])
    })
    return input
}