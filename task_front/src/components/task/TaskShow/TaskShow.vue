<template >
  <material-card class="mx-4" color="primary">
    <v-card-title>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :no-data-text="$t('no-data-available')"
      rows-per-page-text="Registros por página"
      :headers="headers"
      :items="itemsData"
    >
      <template slot="headerCell" slot-scope="{ header }">
        <span class="subheading font-weight-light text-primary" v-text="header.text" />
      </template>

      <template v-slot:items="props">
        <tr color="primary" class="row">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.priority }}</td>
          <td>{{ props.item.expirationDate.substring(0,10) }}</td>
          <td v-if="props.item.status==0">Activo</td>
          <td v-else-if="props.item.status==1">Finalizado</td>
          <td v-else>Eliminado</td>

          <td>
            <v-icon
              size="20"
              title="editar"
              @click="edit(props.item)"
              :disabled="props.item.status!=0"
            >mdi-briefcase-edit</v-icon>
            <v-icon
              size="20"
              title="Eliminar"
              :disabled="props.item.status==3 || props.item.status==1"
              @click="changeStatus(props.item, props.item.status=3)"
            >mdi-bookmark-remove</v-icon>
            <v-icon
              size="20"
              title="Finalizar"
              :disabled="props.item.status==3 || props.item.status==1"
              @click="changeStatus(props.item, props.item.status=1)"
            >mdi-marker-check</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </material-card>
</template>

<script src="./taskShow.js"></script>

<style lang="scss">
.row {
  &:hover {
    cursor: pointer;
  }
}
</style>
