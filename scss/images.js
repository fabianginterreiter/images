.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  .item {
    margin: 1px;
    position: relative;
    overflow: hidden;
    padding: 0;

    .select {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      z-index: 10;
      cursor: pointer;
      padding: 5px;
      visibility: hidden;
    }

    .like {
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      z-index: 10;
      width: 30px;
      height: 30px;
      padding: 5px;
      cursor: pointer;
      visibility: hidden;
      text-align: right;
    }

    .mark {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
    }

    img {
      user-select: none;
    }
  }

  .item:hover {
    .mark {
      background: linear-gradient(to bottom, rgba(0,0,0,0.65) 21%,rgba(0,0,0,0.65) 26%,rgba(0,0,0,0) 60%,rgba(0,0,0,0) 62%);
    }

    .select {
      color: white;
      visibility: visible;
    }

    .like {
      color: white;
      visibility: visible;
    }    

    .like:hover, .select:hover {
      color: $selectedColor;
    }
  }

  .selected {
    .mark {
      border: 10px solid $selectedColor;
    }
  }
}