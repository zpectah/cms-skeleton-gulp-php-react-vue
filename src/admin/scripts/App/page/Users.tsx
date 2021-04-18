import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import routes from '../routes.json';
import { loadUsers } from '../../store/App/actions';
import AppLayout from '../../layout/AppLayout';
import List from '../../component/List';
import { Button } from '../../component/ui';

interface UsersPageProps {}
interface UsersPageState {
	loading: boolean;
}

class UsersPage extends Component<
	UsersPageProps & {
		t: any;
		_Users: any[];
		dispatch: Function;
		match: any;
	},
	UsersPageState
> {
	static props: UsersPageProps = {};
	state: UsersPageState = {
		loading: false,
	};

	loadData() {
		this.props.dispatch(loadUsers());
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
					<Button.CreateNew
						key={1}
						routePathPrefix={routes.users.pathDetail}
					/>,
				]}
			>
				<List.Items
					route={routes.users}
					model={'Users'}
					items={this.props._Users}
					loading={loading}
					columnsLayout={{
						email: true,
						nickname: true,
						active: true,
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

const PageWithTranslations = withTranslation()(UsersPage);

export default connect(mapStateToProps)(PageWithTranslations);
