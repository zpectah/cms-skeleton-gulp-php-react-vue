import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';

import routes from '../routes.json';
import Api from '../../utils/Api';
import { setPosts } from '../../store/App/actions';
import AppLayout from '../../layout/AppLayout';
import ListItems from '../../component/ListItems';
import { Button } from '../../component/ui';

interface PostsPageProps {}

interface PostsPageState {
	items: any[];
	loading: boolean;
}

class PostsPage extends Component<
	PostsPageProps & {
		t: any;
		_Posts: any[];
		dispatch: Function;
		match: any;
		history: any;
	},
	PostsPageState
> {
	static props: PostsPageProps = {};
	state: PostsPageState = {
		items: [],
		loading: false,
	};

	loadData() {
		this.setState({ loading: true });
		Api.GET('http://skeleton-php-cms/api/get_posts').then((data) => {
			this.props.dispatch(setPosts(data.data));
			this.setState({ loading: false });
		});
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		const { loading } = this.state;

		return (
			<AppLayout
				route={routes.posts}
				app={'App'}
				withSidebar
				widthHeader
				withFooter
				metaTitle={this.props.t('page:Posts_meta_title')}
				headerTitle={this.props.t('page:Posts_page_title')}
				headerChildren={[
					<Button.Base
						key={1}
						type={'primary'}
						onClick={() => {
							this.props.history.push(routes.posts.pathDetail + '/new');
						}}
						icon={<PlusOutlined />}
					>
						Create new
					</Button.Base>,
				]}
			>
				<ListItems
					route={routes.posts}
					model={'Posts'}
					items={this.props._Posts}
					loading={loading}
					columnsLayout={{
						// name: true,
						title: true,
						tags: true,
						category: true,
					}}
					orderByColumns={{
						name: true,
					}}
					detailId={this.props.match.params.id}
					onReload={() => this.loadData()}
					searchAttrs={['name', 'lang.en.title']}
					selectable
					allowDelete
				/>
			</AppLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		_Posts: state.$App.Posts,
	};
}

const PageWIthTranslations = withTranslation()(PostsPage);

export default connect(mapStateToProps)(PageWIthTranslations);
