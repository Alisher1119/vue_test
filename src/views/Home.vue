<template>
  <div>
    <h3 class="mx-5 p-3">Alisher KHAYRILLAEV</h3>
    <div class="container-fluid px-5 m-auto row">
      <div class="col-md-4">
        <Filters />
      </div>
      <div class="col-md-8">
        <Table />
      </div>
    </div>
  </div>
</template>

<script>

import Filters from '@/components/Filters.vue'
import Table from '@/components/Table.vue'

export default {
  name: 'Home',
  components: {
    Table,
    Filters
  }
}
</script>
