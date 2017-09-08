import Images from "./Images";
import {connect} from "react-redux";
import {Image} from "../types";
import Thumbnails from "./Thumbnails";

class AlbumImages extends Images<{
  images: Image[];
}, {}> {
  public render() {
    return (<div id="container">
      {super.renderFullscreen()}
      <Thumbnails images={super.props.images}
        width={super.state.width}
        renderContent={(image: Image) => super.renderContent(image)}
        onDateSelect={(year: number, month: number, day: number) => super.handleDateSelect(year, month, day)} />
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumImages);
