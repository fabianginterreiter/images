import * as React from 'react'
import * as moment from 'moment'
import Images from './Images'
import ImagesStore from '../stores/ImagesStore'
import ImagesNav from './ImagesNav'

interface DateViewProps {
  params: {
    year?: number;
    month?: number;
    day?: number;
  }
}

export default class DateView extends React.Component<DateViewProps, {}> {

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(newProps: DateViewProps) {
    var url = '/api/images';
    if (newProps.params.year) {
      url += '?year=' + newProps.params.year;

      if (newProps.params.month) {
        url += '&month=' + newProps.params.month;

        if (newProps.params.day) {
          url += '&day=' + newProps.params.day;
        }
      }
    }

    ImagesStore.load(url);
  }

  private renderTitle() {
    let date = moment().year(this.props.params.year);

    if (this.props.params.month) {
      date.month(this.props.params.month - 1);

      if (this.props.params.day) {
        date.date(this.props.params.day);
        return date.format('MMMM D. YYYY')
      }

      return date.format('MMMM YYYY');
    }

    return date.format('YYYY');
  }

  render() {
    return (
      <div>
        <h1>
          <i className="fa fa-calendar" aria-hidden="true" /> {this.renderTitle()}
          <ImagesNav />
        </h1>
        <Images />
      </div>
    );
  }
}
