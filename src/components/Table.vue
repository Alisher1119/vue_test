<template>
  <div class="overflow-auto">
    <!-- <b-table
      id="my-table"
      :items="rows"
      :per-page="perPage"
      :current-page="page"
    ></b-table> -->
    <table class="table">
      <tr>
        <th>Name</th>
        <th>Task Statuses</th>
        <th>Task Types</th>
        <th>Task Priorities</th>
      </tr>
      <tr v-for="row of rows" :key="row.name">
        <td>{{ row.name }}</td>
        <td>{{ row.task_statuses }}</td>
        <td>{{ row.task_types }}</td>
        <td>{{ row.task_priorities }}</td>
      </tr>
    </table>
    <p class="mt-3 small">Current Page: {{ page }}</p>
    <b-pagination
      v-model="page"
      :total-rows="total"
      :per-page="perPage"
      aria-controls="my-table"
      @change="changePage"
      pills
    ></b-pagination>
  </div>
</template>

<script>
import rest from '@/providers/RestProvider'

export default {
  name: 'Table',
  props: {
    msg: String
  },
  data () {
    return {
      rows: [],
      total: 0,
      page: 1,
      perPage: 10,
      taskStatusesUrl: 'https://furorprogress.uz/test/fp/task-statuses',
      taskTypesUrl: 'https://furorprogress.uz/test/fp/task-types',
      taskPrioritiesUrl: 'https://furorprogress.uz/test/fp/task-priorities',
      taskStatusId: null,
      taskTypeId: null,
      taskPriorityId: null,
      taskStatuses: [],
      taskTypes: [],
      taskPriorities: []
    }
  },
  computed: {
    getFilters () {
      return this.$store.state.filters
    }
  },
  watch: {
    getFilters (value) {
      this.getData(true)
    }
  },
  async mounted () {
    await this.getExtraData()
    await this.getData()
  },
  methods: {
    async getExtraData () {
      await rest.getData(this.taskTypesUrl).then(response => {
        this.taskTypes = response.data.rows
      }).catch(err => {
        throw err
      })
      await rest.getData(this.taskStatusesUrl).then(response => {
        this.taskStatuses = response.data.rows
      }).catch(err => {
        throw err
      })
      await rest.getData(this.taskPrioritiesUrl).then(response => {
        this.taskPriorities = response.data.rows
      }).catch(err => {
        throw err
      })
    },
    async getData (reload = false) {
      const filters = this.$store.state.filters

      /* eslint-disable */
      if (reload == true) {
        this.page = 1
      }
      
      let url = `https://furorprogress.uz/test/fp/test-tasks?page=${this.page}&perPage=${this.perPage}`

      if (filters.taskStatusId != null) {
        url += '&task_statuses_id=' + filters.taskStatusId
      }
      if (filters.taskTypeId != null) {
        url += '&task_types_id=' + filters.taskTypeId
      }
      if (filters.taskPriorityId != null) {
        url += '&task_priorities_id=' + filters.taskPriorityId
      }
      this.rows = []
      await rest.getData(url).then(response => {
        for (let i = 0; i < response.data.rows.length; i++) {
          this.rows.push({
            name: response.data.rows[i].name,
            task_statuses: this.getTaskStatuses(response.data.rows[i].task_statuses_id),
            task_types: this.getTaskTypes(response.data.rows[i].task_types_id),
            task_priorities: this.getTaskPriorities(response.data.rows[i].task_priorities_id)
          })
        }
        this.total = response.data.total
      }).catch(err => {
        throw err
      })
    },
    changePage (page) {
      if(this.page != page) {
        this.page = page
        this.getData()
      }
    },
    getTaskStatuses (id) {
      let name = ''
      this.taskStatuses.forEach(task => {
        /* eslint-disable */
        if (task.id == id) {
          name = task.name
        }
      })

      return name;
    },
    getTaskTypes (id) {
      let name = ''
      this.taskTypes.forEach(task => {
        /* eslint-disable */
        if (task.id == id) {
          name = task.name
        }
      })

      return name;
    },
    getTaskPriorities (id) {
      let name = ''
      this.taskPriorities.forEach(task => {
        /* eslint-disable */
        if (task.id == id) {
          name = task.name
        }
      })

      return name;
    }
  }
}
</script>

<style scoped>
.table {
  border: 1px solid #ccc;
}
.table tr:nth-child(even) {
  background: #eee;
}
</style>