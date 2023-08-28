export const getReturnParamsFromSpotify = (hash: any) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInURL = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInURL.reduce((accumulator: any, currentValue: any) => {
      const [key, value] = currentValue.split("=");
      accumulator [key] = value;
      return accumulator;
    }, {})

    return paramsSplitUp;
};
  