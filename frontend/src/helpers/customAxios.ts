import axios from 'axios';

const baseURL = "http://localhost:5500/";

const customAxios = async(props: {method:string, url:string, data?: object}) => {
	const response = await axios({
		method: props.method,
		url: `${baseURL}${props.url}`,
		data: props.data
	});

	return response.data;
}

export default customAxios;