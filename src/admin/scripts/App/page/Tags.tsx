import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import routes from '../routes.json';
import { loadTags } from '../../store/App/actions';
import AppLayout from '../../layout/AppLayout';
import ListItems from '../../component/ListItems';
import { Button } from '../../component/ui';

interface TagsPageProps {}
interface TagsPageState {
	loading: boolean;
}

class TagsPage extends Component<
	TagsPageProps & {
		t: any;
		_Tags: any[];
		dispatch: Function;
		match: any;
	},
	TagsPageState
> {
	static props: TagsPageProps = {};
	state: TagsPageState = {
		loading: false,
	};

	loadData() {
		this.props.dispatch(loadTags());
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		const { loading } = this.state;

		return (
			<AppLayout
				route={routes.tags}
				app={'App'}
				withSidebar
				widthHeader
				withFooter
				metaTitle={this.props.t('page:Tags_meta_title')}
				headerTitle={this.props.t('page:Tags_page_title')}
				headerChildren={[
					<Button.CreateNew key={1} routePathPrefix={routes.tags.pathDetail} />,
				]}
			>
				<ListItems
					route={routes.tags}
					model={'Tags'}
					items={this.props._Tags}
					loading={loading}
					columnsLayout={{
						name: true,
						active: true,
					}}
					orderByColumns={{
						name: true,
					}}
					detailId={this.props.match.params.id}
					onReload={() => this.loadData()}
					searchAttrs={['key']}
					selectable
					allowDelete
				/>
			</AppLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		_Tags: state.$App.Tags,
	};
}

const PageWithTranslations = withTranslation()(TagsPage);

export default connect(mapStateToProps)(PageWithTranslations);
