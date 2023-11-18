<script setup lang="ts">
import { onMounted } from 'vue'
import { Modal } from 'bootstrap'

onMounted(() => {
  const modal = new Modal('#finishedModal')
  modal.show()
})

const GOTO = 'https://github.com/bytesiz3d/'
const IMG_CONGRATS = 'https://media.tenor.com/lxlmVWCDHi0AAAAC/adel-emam.gif'
</script>

<template>
  <div class="modal fade" id="finishedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="finishedModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div dir="rtl" class="modal-header">
          <h1 class="modal-title fs-5" id="finishedModalLabel">حمدلله بالسلامة يا بطل 💗</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="margin-right: auto; margin-left: 0"></button>
        </div>
        <div class="modal-body">
          <img :src="IMG_CONGRATS" class="img-fluid img-thumbnail mb-2" />
          <iframe style="border-radius:12px"
            src="https://open.spotify.com/embed/playlist/6ThcvROZOpcYHEHEVWhk6T?utm_source=generator&theme=0" width="100%"
            height="152" frameBorder="0" allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
        <form :action="GOTO" class="w-100 modal-footer">
          <button type="submit" class="btn btn-secondary w-50 mx-auto">Go Home</button>
        </form>
      </div>
    </div>
  </div>
</template>