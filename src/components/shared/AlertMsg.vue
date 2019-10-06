<<template>
  <div class="alertmsg">
    <v-alert color="error" icon="warning" dismissible @input="onClose" :value="true">
      {{ text }}
    </v-alert>
  </div>
</template>
<<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>

