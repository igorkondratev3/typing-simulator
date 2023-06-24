<script setup lang="ts">
defineProps<{
  accuracy: string;
  printSpeed: string;
}>();
</script>

<template>
  <div class="statistic">
    <div class="statistic__parameter statistic-parameter">
      <img
        class="statistic-parameter__icon"
        src="/src/assets/svg/speed.svg"
        alt="speed"
      />
      <div class="statistic-parameter__parameter">
        <h4 class="statistic-parameter__header">Скорость:</h4>
        <div class="statistic-parameter__value">
          <p class="statistic-parameter__speed">{{ printSpeed }}</p>
          <p class="statistic-parameter__units">зн/мин</p>
        </div>
      </div>
    </div>
    <div class="statistic__parameter statistic-parameter">
      <img
        class="statistic-parameter__icon"
        src="/src/assets/svg/task.svg"
        alt="accuracy"
      />
      <div class="statistic-parameter__parameter">
        <h4 class="statistic-parameter__header">Точность:</h4>
        <div class="statistic-parameter__value">
          <p class="statistic-parameter__accuracy">
            {{ accuracy }}
          </p>
          <p class="statistic-parameter__units">%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.statistic {
  display: flex;
  justify-content: space-around;
  font-size: calc(var(--base) * 0.24);
}

.statistic-parameter {
  display: flex;
  align-items: center;
}

.statistic-parameter__icon {
  width: calc(var(--base) * 0.48);
  height: calc(var(--base) * 0.48);
  margin-right: calc(var(--base) * 0.08);
}

.statistic-parameter__parameter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistic-parameter__header {
  font-size: calc(var(--base) * 0.24);
  text-align: center;
}

.statistic-parameter__value {
  display: flex;
}

.statistic-parameter__speed {
  width: calc(var(--base) * 0.5);
  margin-right: calc(var(--base) * 0.02);
  font-size: calc(var(--base) * 0.28);
  text-align: center;
}

.statistic-parameter__accuracy {
  width: calc(var(--base) * 0.9);
  margin-right: calc(var(--base) * 0.02);
  font-size: calc(var(--base) * 0.28);
  text-align: center;
}

.statistic-parameter__units {
  display: flex;
  align-items: center;
  font-size: calc(var(--base) * 0.2);
}

@media (max-width: 501px) {
  .statistic-parameter__icon {
    width: calc(var(--base) * 0.24);
    height: calc(var(--base) * 0.24);
  }

  .statistic-parameter__speed {
    font-size: calc(var(--base) * 0.24);
    width: calc(var(--base) * 0.45);
  }

  .statistic-parameter__accuracy {
    font-size: calc(var(--base) * 0.24);
    width: calc(var(--base) * 0.8);
  }
}
</style>
