<script setup>
defineProps({
  accuracy: String,
  printSpeed: String
});
</script>

<template>
  <div class="typing-test__statistic statistic">
    <div class="statistic__icon-and-parameter">
      <img class="statistic__icon" src="/src/assets/svg/speed.svg" />
      <div class="statistic__parameter statistic-parameter">
        <p class="statistic-parameter__header">Скорость:</p>
        <div class="statistic-parameter__value">
          <p class="statistic-parameter__speed">{{ printSpeed }}</p>
          <p>зн/мин</p>
        </div>
      </div>
    </div>
    <div class="statistic__icon-and-parameter">
      <img class="statistic__icon" src="/src/assets/svg/task.svg" />
      <div class="statistic__parameter statistic-parameter">
        <p class="statistic-parameter__header">Точночть:</p>
        <div class="statistic-parameter__value">
          <p class="statistic-parameter__accuracy">
            {{ accuracy }}
          </p>
          <p>%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.statistic {
  display: flex;
  justify-content: space-around;
  font-size: 24px;
}

.statistic__parameter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistic__icon-and-parameter {
  display: flex;
  align-items: center;
}

.statistic__icon {
  width: 48px;
  height: 48px;
  margin-right: 8px;
}

.statistic-parameter__value {
  display: flex;
}

.statistic-parameter__speed {
  width: 50px;
  text-align: center;
}

.statistic-parameter__accuracy {
  width: 75px;
  text-align: center;
}
</style>
