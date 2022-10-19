import {useReducer, useCallback} from "react";

// httpReducer 는 loading 과 error 를 관리한다.
// loading 은 true/false 로 관리하고, error 는 null/string 으로 관리한다.
// loading 은 http 요청을 보내는 중인지 아닌지를 나타내고, error 는 http 요청이 실패했을 때 에러 메시지를 나타낸다.
// http 요청을 보내는 중이면 loading 을 true 로, 요청이 완료되면 loading 을 false 로 설정한다.
// http 요청이 실패하면 error 에 에러 메시지를 설정하고, http 요청이 성공하면 error 를 null 로 설정한다.
const httpReducer = (curHttpState, action) => {
	switch (action.type) {
		case 'SEND':
			return { loading: true, error: null, data: null };
		case 'RESPONSE':
			return { ...curHttpState, loading: false, data: action.responseData };
		case 'ERROR':
			return { loading: false, error: action.errorMessage };
		case 'CLEAR':
			return { ...curHttpState, error: null };
		default:
			throw new Error('httpReducer::Should not be reached!');
	}
};

const useHttp = () => {
	//useReducer 를 사용하여 httpState 를 관리한다.
	//httpReducer 는 reducer 함수이고, {loading: false, error: null} 는 초기값이다.
	const [httpState, dispatchHttp] = useReducer(httpReducer, {
		loading: false,
		error: null,
		data: null,
	});

	//sendRequest 는 http 요청을 보내는 함수이다.
	//sendRequest 는 http 요청을 보내는 중이면 loading 을 true 로, 요청이 완료되면 loading 을 false 로 설정한다.
	//http 요청이 실패하면 error 에 에러 메시지를 설정하고, http 요청이 성공하면 error 를 null 로 설정한다.
	//http 요청이 성공하면 response 에 응답 데이터를 설정한다.
	const sendRequest = useCallback((url, method, body, reqExtra)=>{
		dispatchHttp({type: 'SEND'});
		/*fetch() 는 브라우저에서 제공하는 API 로서,  HTTP 요청을 보내는 함수
     * 첫번째 인자로 요청할 URL 을 전달하고, 두번째 인자로 요청에 대한 설정을 전달
     * 설정에는 method, body, header 등이 있음
     * method 는 요청의 종류를 설정하며, GET, POST, PUT, DELETE 등이 있음
     * body 는 요청에 포함할 데이터를 설정하며, JSON 형식으로 전달
     * string 형식으로 전달하려면 JSON.stringify() 를 사용
     * header 는 요청에 포함할 헤더를 설정하며, JSON 형식으로 전달
     * fetch() 는 Promise 를 반환하며, then() 을 통해 응답을 처리할 수 있음
     * 응답은 response 객체로 전달되며, response.json() 을 통해 JSON 형식의 데이터를 반환
     * 반환된 데이터는 then() 의 콜백 함수의 인자로 전달됨
     * catch() 를 통해 에러를 처리할 수 있음*/
		fetch(
				url,
				{
					method: method,
					body: body,
					headers: { 'Content-Type': 'application/json' },
				},
		)
				.then((response) => {
					//setIsLoading(false);
					/*response.json() 을 통해 반환된 데이터는 then() 의 콜백 함수의 인자로 전달됨
					 * 이 데이터는 Firebase 에서 생성된 고유한 ID 값임*/
					return response.json();
				})
				.then((responseData) => {
					dispatchHttp({
						type: 'RESPONSE',
						responseData: responseData,
						extra: reqExtra,
					});
					/*setUserIngredients((prevIngredients) => [
						...prevIngredients,
						/!*...ingredient 는 기존의 배열에 새로운 요소를 추가하고 새로운 배열을 반환한다.
						 * 새로운 요소는 {id: 'id', title: 'title', amount: 'amount'} 형태로 추가된다.*!/
						{ id: responseData.name, ...ingredient },
					]);*/
				})
				.catch((error) => {
					/*setError('재료 추가 요청 처리 중 에러가 발생했습니다.');
					setIsLoading(false);*/
					dispatchHttp({
						type: 'ERROR',
						errorMessage: '재료 추가 요청 처리 중 에러가 발생했습니다.',
					});
				});
		return {
			isLoading: httpState.loading,
			data: httpState.data,
			error: httpState.error,
			sendRequest: sendRequest,
		}
	}, []);


}
export default useHttp