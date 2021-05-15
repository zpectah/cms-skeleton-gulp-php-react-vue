import environmental from '../../config/environmental.json';

const build_env = window.WARP_ENVIRONMENT;
const build_timestamp = window.WARP_TIMESTAMP;

export default {
	TIMESTAMP: build_timestamp,
	ROOT_PATH: environmental[build_env].ROOT_PATH,
};