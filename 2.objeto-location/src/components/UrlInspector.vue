<template>
  <div class="inspector-container">
    <h2>Inspector de URL</h2>
    <table>
      <thead>
        <tr>
          <th>Propiedad</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>href</td>
          <td>{{ urlData.href }}</td>
        </tr>
        <tr>
          <td>protocol</td>
          <td>{{ urlData.protocol }}</td>
        </tr>
        <tr>
          <td>hostname</td>
          <td>{{ urlData.hostname }}</td>
        </tr>
        <tr>
          <td>port</td>
          <td>{{ urlData.port || '(vacío)' }}</td>
        </tr>
        <tr>
          <td>pathname</td>
          <td>{{ urlData.pathname }}</td>
        </tr>
        <tr>
          <td>search</td>
          <td>{{ urlData.search || '(vacío)' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";

interface UrlParts {
  href: string;
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
}

const urlData = reactive<UrlParts>({
  href: "",
  protocol: "",
  hostname: "",
  port: "",
  pathname: "",
  search: ""
});


onMounted(() => {
  urlData.href = window.location.href;
  urlData.protocol = window.location.protocol;
  urlData.hostname = window.location.hostname;
  urlData.port = window.location.port;
  urlData.pathname = window.location.pathname;
  urlData.search = window.location.search;
});
</script>

<style scoped>
.inspector-container {
  background-color: #1a1a1a;
  color: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

h2 {
  margin-top: 0;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse; 
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #333; 
  word-break: break-all; 
}

tbody tr:last-child td {
  border-bottom: none; 
}

th {
  color: #aaa; 
}
</style>
