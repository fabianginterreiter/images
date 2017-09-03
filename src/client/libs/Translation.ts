import cookie from "react-cookie";

const SET_LANGUAGE = "SET_LANGUAGE";
const ADD_LANGUAGE = "ADD_LANGUAGE";
const SET_FALLBACK = "SET_FALLBACK";

export const setLanguage = (language: string) => {
  cookie.save("language", language);

  return {
    language,
    type: SET_LANGUAGE
  }
};

export const addLanguage = (language: string, data: object) => {
  return {
    language: language,
    data: data,
    type: ADD_LANGUAGE
  };
};

export const setDefaultLanguage = (language: string) => {
  return {
    language: language,
    type: SET_FALLBACK
  }
}

export const translate = (store, key:string, values: string[]): string => {
  let value = store.localizeReducer.translation[key];

  if (!value) {
    value = store.localizeReducer.fallback[key];
  }

  if (!value) {
    return key;
  }

  values.forEach((text, index) => {
     value = value.replace(new RegExp("\\{" + index + "\\}", "g"), text);
  });

  return value;
}

let store = null;

export const setLocalizeStore = (object) => {
  store = object;
}

export const t = (key, ...values: string[]) => {
  if (store == null) {
    return key;
  }

  return translate(store.getState(), key, values);
}

export const getLanguage = (state) => {
  return state.localizeReducer.language
};

const load = (data: { [key:string]:string;}, path: string, object: object) => {
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === "string") {
      data[path + key] = object[key];
    } else {
      load(data, path + key + ".", object[key]);
    }
  });

  return data;
}

export const localizeReducer = (state = {
  language: null,
  languages: {},
  translation: {},
  fallback: {}
}, action) => {
    switch (action.type) {
      case SET_LANGUAGE:
        if (!state.languages[action.language]) {
          return state;
        }

        return {
          ...state,
          language: action.language,
          translation: load({}, '', state.languages[action.language])
        };
      case SET_FALLBACK:
        return {
          ...state,
          defaultLanguage: action.language,
          fallback: load({}, '', state.languages[action.language])
        };
      case ADD_LANGUAGE:
        const languages = {...state.languages};
        languages[action.language] = action.data;

        return {
          ...state,
          languages
        };
      default:
        return state;
    }
};
