/* eslint-disable */
<template>
  <div>
    <autocomplete class="mb-2"
      :search="searchStatuses"
      placeholder="Task Statuses"
      aria-label="Task Statuses"
      @submit="handleSubmitStatuses"
      ></autocomplete>
    <autocomplete class="my-2"
      :search="searchTypes"
      placeholder="Task Types"
      aria-label="Task Types"
      @submit="handleSubmitTypes"
      ></autocomplete>
    <autocomplete class="my-2"
      :search="searchPriorities"
      placeholder="Task Priorities"
      aria-label="Task Priorities"
      @submit="handleSubmitPriorities"
      ></autocomplete>
  </div>
</template>

<script>

import rest from '@/providers/RestProvider'

export default {
  name: 'Filters',
  props: {
  },
  data () {
    return {
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
  components: {
  },
  mounted () {
    this.getTaskStatuses()
    this.getTaskTypes()
    this.getTaskPriorities()
    this.commitFilters()
  },
  methods: {
    searchStatuses (input) {
      if (input.length < 1) {
        this.taskStatusId = null
        this.commitFilters()
        return []
      }

      return this.taskStatuses.filter(taskStatus => {
        return taskStatus.toLowerCase()
          .startsWith(input.toLowerCase())
      })
    },
    searchTypes (input) {
      if (input.length < 1) {
        this.taskTypeId = null
        this.commitFilters()
        return []
      }

      return this.taskTypes.filter(taskType => {
        return taskType.toLowerCase()
          .startsWith(input.toLowerCase())
      })
    },
    searchPriorities (input) {
      if (input.length < 1) {
        this.taskPriorityId = null
        this.commitFilters()
        return []
      }

      return this.taskPriorities.filter(taskPriority => {
        return taskPriority.toLowerCase()
          .startsWith(input.toLowerCase())
      })
    },
    handleSubmitStatuses (result) {
      /* eslint-disable */
      for (let id in this.taskStatuses) {
        /* eslint-disable */
        if (this.taskStatuses[id] == result) {
          this.taskStatusId = id
        }
      }
      this.commitFilters()
    },
    handleSubmitTypes (result) {
      /* eslint-disable */
      for (let id in this.taskTypes) {
        /* eslint-disable */
        if (this.taskTypes[id] == result) {
          this.taskTypeId = id
        }
      }
      this.commitFilters()
    },
    handleSubmitPriorities (result) {
      /* eslint-disable */
      for (let id in this.taskPriorities) {
        /* eslint-disable */
        if (this.taskPriorities[id] == result) {
          this.taskPriorityId = id
        }
      }
      this.commitFilters()
    },
    commitFilters () {
      const filters = {
        taskStatusId: this.taskStatusId,
        taskTypeId: this.taskTypeId,
        taskPriorityId: this.taskPriorityId,
      }
      this.$store.commit('saveFilters', filters)
      // console.log(this.$store.state.filters)
    },
    getTaskStatuses () {
      rest.getData(this.taskStatusesUrl).then(response => {
        for (let i = 0; i < response.data.rows.length; i++) {
          this.taskStatuses[response.data.rows[i].id] = response.data.rows[i].name
        }
      }).catch(err => {
        throw err
      })
    },
    getTaskTypes () {
      rest.getData(this.taskTypesUrl).then(response => {
        for (let i = 0; i < response.data.rows.length; i++) {
          this.taskTypes[response.data.rows[i].id] = response.data.rows[i].name
        }
      }).catch(err => {
        throw err
      })
    },
    getTaskPriorities () {
      rest.getData(this.taskPrioritiesUrl).then(response => {
        for (let i = 0; i < response.data.rows.length; i++) {
          this.taskPriorities[response.data.rows[i].id] = response.data.rows[i].name
        }
      }).catch(err => {
        throw err
      })
    }
  }
}
</script>
