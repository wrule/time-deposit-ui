import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './app.module.scss';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

@Component
export default class App extends Vue {
  public render(): VNode {
    return (
      <a-config-provider locale={zhCN}>
        <a-layout class={style.app}>
          <a-layout-header class={style.header}>
            <span class={style.name}>鸡毛区块链银行（营业部）</span>
          </a-layout-header>
          <a-layout>
            <a-layout-sider class={style.sider}>
              <a-menu class={style.menu}>
                <a-menu-item>ETH业务</a-menu-item>
                <a-menu-item>山寨币业务</a-menu-item>
                <a-menu-item>DEFI业务</a-menu-item>
                <a-menu-item>JMAO Token</a-menu-item>
              </a-menu>
            </a-layout-sider>
            <a-layout-content class={style.content}>
              <router-view />
            </a-layout-content>
          </a-layout>
        </a-layout>
      </a-config-provider>
    );
  }
}
