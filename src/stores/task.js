import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import router from '@/router'
import { useUserStore } from '@/stores/user'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  actions: {
    async fetchTasks() {
      const userStore = useUserStore();
      if (userStore.user) {
        const { data: tasks, error } = await supabase
          .from('tasks')
          .select('*')
          .order('id', { ascending: false })
          .match({ user_id: userStore.user.id });
        if (error) {
          console.error('Error fetching tasks:', error.message);
        } else {
          this.tasks = tasks;
        }
      }
    },
    async submitTask(newTaskTitle, newTaskDescription) {
      const userStore = useUserStore()
      if (newTaskTitle.trim() !== '') {
        const { error } = await supabase.from('tasks').insert([
          {
            user_id: userStore.user.id,
            title: newTaskTitle,
            description: newTaskDescription
          }
        ])
        if (error) {
          console.error('Error adding a task:', error.message)
        } else {
          await this.fetchTasks()
          router.push('/')
        }
      }
    },
    async deleteTask(taskId) {

      const { error } = await supabase.from('tasks').delete().match({id:taskId})
      if (error) {
        console.error('Error deleting task:', error.message)
      } else this.tasks=this.tasks.filter((task) => task.id !== taskId)
    },
    async editTask(taskId, updatedTaskData) {
      const { error } = await supabase
        .from('tasks')
        .update(updatedTaskData)
        .match({ id: taskId });
      if (error) {
        console.error('Error updating task:', error.message);
      } else {
        await this.fetchTasks();
      }
    },
    async completeTask(taskId, isComplete) {
      const { error } = await supabase
        .from('tasks')
        .update({ is_complete: isComplete }) 
        .match({ id: taskId });
      if (error) {
        console.error('Error completing task:', error.message);
      } else {
        await this.fetchTasks();
      }
    },
    
  }
})


