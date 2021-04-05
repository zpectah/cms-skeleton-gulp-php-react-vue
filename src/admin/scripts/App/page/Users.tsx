import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';

import routes from '../routes.json';
import Api from '../../utils/Api';
import { setUsers } from '../../store/App/actions';
import AppLayout from '../../layout/AppLayout';
import ListItems from '../../component/ListItems';
import { Button } from '../../component/ui';

interface UsersPageProps {}
interface UsersPageState {
	items: any[];
	loading: boolean;
}

class UsersPage extends Component<
	UsersPageProps & {
		t: any;
		_Users: any[];
		dispatch: Function;
		match: any;
		history: any;
	},
	UsersPageState
> {
	static props: UsersPageProps = {};
	state: UsersPageState = {
		items: [],
		loading: false,
	};

	loadData() {
		this.setState({ loading: true });
		Api.GET('http://skeleton-php-cms/api/get_users').then((data) => {
			this.props.dispatch(setUsers(data.data));
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
				route={routes.users}
				app={'App'}
				withSidebar
				widthHeader
				withFooter
				metaTitle={this.props.t('page:Users_meta_title')}
				headerTitle={this.props.t('page:Users_page_title')}
				headerChildren={[
					<Button.Base
						key={1}
						type={'primary'}
						onClick={() => {
							this.props.history.push(routes.users.pathDetail + '/new');
						}}
						icon={<PlusOutlined />}
					>
						Create new
					</Button.Base>,
				]}
			>
				<ListItems
					route={routes.users}
					model={'Users'}
					items={this.props._Users}
					loading={loading}
					columnsLayout={{
						email: true,
						nickname: true,
					}}
					orderByColumns={{
						name: true,
						email: true,
					}}
					detailId={this.props.match.params.id}
					onReload={() => this.loadData()}
					searchAttrs={['name', 'nickname', 'email']}
					selectable
					allowDelete
				/>
			</AppLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		_Users: state.$App.Users,
	};
}

const PageWIthTranslations = withTranslation()(UsersPage);

export default connect(mapStateToProps)(PageWIthTranslations);
