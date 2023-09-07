import { CoverImage, CoverView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { inject, observer } from "mobx-react";
import { Component } from "react";
import "./index.scss";

type PageStateProps = {
  store: {
    globalStore: {
      selected: number;
      changeIndex: Function;
    };
  };
};

interface customTabBar {
  props: PageStateProps;
}

@inject("store")
@observer
class customTabBar extends Component {
  state = {
    selected: 0,
    color: "rgba(68, 68, 68, 1)",
    selectedColor: "rgba(68, 68, 68, 1)",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "/assets/images/home.png",
        selectedIconPath: "/assets/images/home_active.png",
      },
      {
        pagePath: "pages/genderPage/index",
        text: "我的",
        iconPath: "/assets/images/me.png",
        selectedIconPath: "/assets/images/me_active.png",
      },
    ],
  };

  switchTab = (item) => {
    const url = "/" + item.pagePath;
    Taro.switchTab({
      url: url,
    });
  };

  render() {
    const { globalStore: { selected }} = this.props.store;

    return (
      <CoverView className="custom-tab">
        {this.state.list.map((item, index) => {

          return (
            <CoverView
              className="custom-tab-item"
              onClick={this.switchTab.bind(this, item)}
              data-path={item.pagePath}
              key={item.text}
            >
              <CoverImage
                className="custom-tab-item-img"
                src={selected === index ? item.selectedIconPath : item.iconPath}
              />
              <CoverView
                className="custom-tab-item-text"
                style={{
                  color:
                    selected === index
                      ? this.state.selectedColor
                      : this.state.color,
                }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
    );
  }
}

export default customTabBar;
