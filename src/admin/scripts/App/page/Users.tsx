import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import routes from '../routes.json';
import Api from '../../utils/Api';
import { setUsers } from '../../store/App/actions';
import AppLayout from '../../layout/AppLayout';
import ListItems from '../../component/ListItems';

interface UsersPageProps {}
interface UsersPageState {
	items: any[];
	loading: boolean;
}

class UsersPage extends Component<
	UsersPageProps & { t: any; _Users: any[]; dispatch: Function; match: any },
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
			>
				<ListItems
					route={routes.users}
					model={'Users'}
					items={this.props._Users}
					loading={loading}
					columnsLayout={{
						name: true,
						tags: true,
						category: true,
					}}
					detailId={this.props.match.params.id}
					onReload={() => this.loadData()}
				/>
			</AppLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		_Users: state.$App.Users,
		dispatch: state.dispatch,
	};
}

const PageWIthTranslations = withTranslation()(UsersPage);

export default connect(mapStateToProps)(PageWIthTranslations);
