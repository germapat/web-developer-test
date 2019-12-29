<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :mini-variant="mini"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img :gradient="sidebarOverlayGradiant" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile class="mt-3">
          <v-divider />
          <!--<v-list-tile-action :class="{'pl-4': !mini}">
            <v-btn icon @click.stop="mini = !mini">
              <v-icon medium v-if="!mini">mdi-chevron-left</v-icon>
              <v-icon medium v-else>mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-tile-action>-->
        </v-list-tile>

        <v-divider />

        <v-treeview v-model="tree" :items="items" open-all open-on-click open.sync="open">
          <template slot="label" slot-scope="props">
            <router-link
              :class="{'is-active': subIsActive(props.item)}"
              v-if="props.item.to"
              :to="props.item.to"
            >
              <v-icon>{{ props.item.icon }}</v-icon>
              {{ props.item.name }}
            </router-link>
            <span v-else>{{ props.item.name }}</span>
          </template>
        </v-treeview>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from "vuex";
import i18n from "../../i18n/index";

export default {
  data: () => ({
    items: [
      {
        to: "/dashboard",
        name: "Inicio"
      },
            {
        to: "/task",
        name: "Crear tareas"
      },

    ],
    mini: false,

    responsive: false,
    tree: []
  }),
  computed: {
    ...mapState("app", ["image", "color"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    },
    sidebarOverlayGradiant() {
      return `${this.$store.state.app.sidebarBackgroundColor}, ${this.$store.state.app.sidebarBackgroundColor}`;
    }
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
    translate(option) {
      let data = JSON.parse(option.data);
      let item = {
        id: option.id,
        name: data.name,
        to: data.path,
        icon: data.icon
      };

      if (option.children) {
        item.children = this.lodash.map(option.children, this.translate);
      }

      return item;
    },
    subIsActive(input) {
      let path = input.to;
      let id = input.id;

      this.open = [id];

      const paths = Array.isArray(path) ? path : [path];

      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0; // current path starts with this path string
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/material-dashboard/variables";

#app-drawer {
  .v-treeview-node__label {
    font-size: 0.9rem;
    font-weight: 300;
  }

  a {
    color: #ffffff;
    width: 13em;
    display: block;
    border-radius: 4px;
    padding: 10px;
  }

  a:hover {
    background-color: #ccc;
    color: $primary;
  }

  .v-list__tile {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }

  .v-image__image--contain {
    top: 9px;
    height: 70%;
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }

  div.v-responsive.v-image > div.v-responsive__content {
    overflow-y: auto;
  }

  .is-active {
    background-color: $primary;
    a {
      color: #fff;
    }
  }
}
</style>
