import { useReducer, useCallback } from "react";

const initialState = {
	status: "",
	error: null,
	data: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "pending":
			return {
				...state,
				status: "pending",
			};

		case "completed":
			if (action.error) {
				return {
					status: "completed",
					error: action.error,
					data: null,
				};
			} else {
				return {
					status: "completed",
					error: null,
					data: action.data,
				};
			}

		default:
			return initialState;
	}
};

const useHttp = () => {
	const [response, dispatch] = useReducer(reducer, initialState);

	const sendRequest = useCallback((url) => {
		dispatch({ type: "pending" });
		fetch(url)
			.then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res.json()
      })
			.then((res) => {
        dispatch({ type: "completed", data: res })
      })
			.catch((error) => {
				dispatch({ type: "completed", error });
			});
	}, []);

	return [sendRequest, response];
};

export default useHttp;
