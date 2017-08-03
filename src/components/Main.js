require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');
// 获得图片相关信息
let imageDatas = require("../data/imageDatas.json");

// 利用自执行函数， 将图片信息转成url路径
imageDatas = (function(imageArray){
  for(var i=0;i <imageArray.length; i++)
  {
    var singleImageData = imageArray[i];
    singleImageData.imageURL = require("../images/"+singleImageData.fileName);
    imageArray[i] = singleImageData;
  }
  return imageArray;
})(imageDatas);

var ImgFigure = React.createClass({
  render:function(){
    let data=this.props.data;
    return (
      <figure className="img-figure" ref="imgFigure">
        <img src={data.imageURL} alt={data.title}/>
        <figcaption className="img-figcaption">
          <h2>{data.title} </h2>
        </figcaption>
      </figure>
    );
  }
});
class AppComponent extends React.Component {
   Constant={
      centerPos:{left:0, top:0},
      hPosRange:{// 水平方向的取值范围
        leftX:[0,0],
        rightX:[0,0],
        y:[0,0]
      },  
      vPosRange:{// 上方图片的取值范围
        x:[0,0],
        topY:[0,0]
      }  
    };

  // 组件加载之后为每张图设置位置
  componentDidMount(){
    // 首先拿到舞台的大小
    const stage = React.findDOMNode(this.refs.stage),
          stageWidth = stage.scrollWidth,
          stageHeight = stage.scrollHeight,
          halfStageW = Math.ceil(stageWidth/2),
          halfStageH = Math.ceil(stageHeight/2),

    // 其次拿到图片的大小
    const pic = React.findDOMNode(this.refs.imgFigure),
          picWidth = pic.scrollWidth,
          picHeight = pic.scrollHeight,
          halfPicW = Math.ceil(picWidth/2),
          halfPicH = Math.ceil(picHeight/2),

    // 计算中心图片的位置点
    this.Constant.centerPos.left = halfStageW - halfPicW;
    this.Constant.centerPos.top = halfStageH - halfPicH;
    
    // 计算水平方向的位置点
    // 左上角的位置
    this.Constant.hPosRange.leftX[0] = -halfPicW;
    this.Constant.hPosRange.leftX[1] = halfStageW - halfPicW * 3;
    // 右上角的位置
    this.Constant.hPosRange.rightX[0] = halfStageW + halfPicW;
    this.Constant.hPosRange.rightX[1] = stageWidth - halfPicW;
    //最上面的y的位置
    this.Constant.hPosRange.y[0] = - halfPicH;
    //最下面的y的位置
    this.Constant.hPosRange.y[1] = halfStageH - halfPicH;

    // 计算上测的位置点
    this.Constant.vPosRange.topY[0] = - halfPicH;
    this.Constant.vPosRange.topY[1] = halfStageH - picHeight;
    this.Constant.vPosRange.x[0] = halfStageW - halfPicW;
    this.Constant.vPosRange.x[1] = halfStageW /*+ halfPicW*/;
  };
  render() {
    
    var imageFigures=[],
        controllerUnits=[];

        imageDatas.forEach(function(value) {
          imageFigures.push(<ImgFigure data = {value}/>);
        });
    return (
      <section className="stage" ref="stage">
        <section className="img-sec"> 
          {imageFigures}   
        </section>
         <nav className="controller-nav">
            {controllerUnits}
         </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

// try to sync with workspace in local machine
// get it from local machine-no push--must push
export default AppComponent;
