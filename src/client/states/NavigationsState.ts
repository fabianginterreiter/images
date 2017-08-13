import State from "../states/State"
import cookie from "react-cookie"

interface NavigationsStateProps {
  open: boolean;
  pinned: boolean;
}

class NavigationsState extends State<NavigationsStateProps> {
  constructor() {
    var c = cookie.load("pinned") === "true";

    super({
      open:c,
      pinned: c
    });
  }

  open() {
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open:false
    });
  }

  pin() {
    this.setState({
      pinned: !this.getObject().pinned,
      open:true
    });

    cookie.save("pinned", this.getObject().pinned.toString());
  }
}

export default new NavigationsState();
