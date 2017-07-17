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

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">    
        </section>
         <nav className="controller-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

// try to sync with workspace in local machine
export default AppComponent;
