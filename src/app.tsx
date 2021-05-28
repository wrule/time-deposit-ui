import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './app.module.scss';

@Component
export default class App extends Vue {
  public render(): VNode {
    return (
      <div class={style.app}>
        <div class={style.nav}>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <router-view/>
      </div>
    );
  }
}
