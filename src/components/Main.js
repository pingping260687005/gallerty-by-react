require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';
import ReactDOM from 'react-dom';

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

function getRangeRandom(low, high){
    return Math.floor(Math.random()*(high-low)+low);
  }

var ImgFigure = React.createClass({
  getInitialState:function(){
    return {liked:false};
  },
  handleClick:function(event){
    this.setState({liked: !this.state.liked});

  },
  render:function(){
    //如果图片上制定了图片的位置就运用该信息
    var styleObj = {};
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;

    }

    let data=this.props.data;
  
    return (
      <figure className="img-figure" ref = "figure"  style={styleObj}>
        <img src={data.imageURL} alt={data.title} onClick={this.handleClick}/>
        <figcaption className="img-figcaption">
          <h2>{data.title} </h2>
        </figcaption>
      </figure>
    );
  }
});
class AppComponent extends React.Component {
  constructor(props){
    super(props);

		this.state={

			imgsArrangeArr:[

				/*{

					pos:{

						left:0,

						right:0

					},

					rotate:0,

					isInverse:false//图片正反面

					isCenter:false //图片是否居中

				},

				*/

			]

    };  
    
    //设置排布的可取值范围
    this.Constant={
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
  }
   

  // get initial state
  /*getInitialState () {
    return {
      imgsArrangeArr:[
           
      ]
    };
  }*/

/***
 * 重新排布图片
 * @param centerIndex: 中心图片的index
 */
rearrange (centerIndex) { 
    let imgsArrangeArr=this.state.imgsArrangeArr,
			Constant=this.Constant,
			centerPos=Constant.centerPos,
			hPosRange=Constant.hPosRange,
			vPosRange=Constant.vPosRange,
			hPosRangeLeftSecX=hPosRange.leftX,
			hPosRangeRightSecX=hPosRange.rightX,
			hPosRangeY=hPosRange.y,
			vPosRangeTopY=vPosRange.topY,
			vPosRangeX=vPosRange.x,
			imgsArrangeTopArr=[],
			topImgNum=Math.floor(Math.random()*2),//取一个或不取
			topImgSpliceIndex=0,
			imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);


			//首先居中centerIndex的图片,居中对的centerIndex图片不需要旋转

			imgsArrangeCenterArr[0].pos=centerPos;

			//取出要布局上侧的图片的状态信息
			topImgSpliceIndex=Math.floor(Math.random()*(imgsArrangeArr.length-topImgNum));
			imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

			//布局位于上侧的图片
			imgsArrangeTopArr.forEach(function (value,index) {
				imgsArrangeTopArr[index]={
					pos:{
						top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
						left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
					}
				};
			});



			//布局左右两侧的图片

			for (var i = 0,j=imgsArrangeArr.length,k=j/2; i < j; i++) {

				var hPosRangeLORX=null;

				//前半部分布局左边，右半部分布局右边
				if(i<k){
					hPosRangeLORX=hPosRangeLeftSecX;
				}else{
					hPosRangeLORX = hPosRangeRightSecX;
				}

				imgsArrangeArr[i]={
					pos:{
						top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
						left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
					} 
				};
			}

			if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
				imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeArr[0]);
			}

			imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

			this.setState({
				imgsArrangeArr:imgsArrangeArr
			});
}
 
  // 组件加载之后为每张图设置位置
  componentDidMount(){
    // 首先拿到舞台的大小
    
    let stage = ReactDOM.findDOMNode(this.refs.stage),
          stageWidth = stage.scrollWidth,
          stageHeight = stage.scrollHeight,
          halfStageW = Math.ceil(stageWidth/2),
          halfStageH = Math.ceil(stageHeight/2);

    // 其次拿到图片的大小
    let pic = ReactDOM.findDOMNode(this.refs.imgFigure0),
          picWidth = pic.scrollWidth,
          picHeight = pic.scrollHeight,
          halfPicW = Math.ceil(picWidth/2),
          halfPicH = Math.ceil(picHeight/2);

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
    // 最上面的y的位置
    this.Constant.hPosRange.y[0] = - halfPicH;
    // 最下面的y的位置
    this.Constant.hPosRange.y[1] = stageHeight - halfPicH;

    // 计算上测的位置点 // 有点疑问的。不知道他指的是哪个区间
    this.Constant.vPosRange.topY[0] = - halfPicH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfPicH*3 ;
    this.Constant.vPosRange.x[0] = halfStageW - picWidth;
    this.Constant.vPosRange.x[1] = halfStageW /*+ halfPicW*/;

    // 随机分布
    this.rearrange(0);
};
  render() {
    
    var imageFigures=[],
        controllerUnits=[];
      
        imageDatas.forEach(function(value,index) {
            //将所有的图片定位的左上角
            if(!this.state.imgsArrangeArr[index]){
              this.state.imgsArrangeArr[index] = {
                  pos:{left:0, top:0}
              }
            }

          imageFigures.push(<ImgFigure data = {value} ref={'imgFigure'+index} arrange = {this.state.imgsArrangeArr[index]}/>);
        }.bind(this));
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


// Getting start doc, refer to: http://www.ruanyifeng.com/blog/2015/03/react.html
