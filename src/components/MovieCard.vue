<template>
  <div class="card horizontal row">
    <div class="card-image col s3">
      <img
        src="https://images-na.ssl-images-amazon.com/images/I/51poKKV63GL.jpg"
      />
    </div>
    <div class="card-stacked col s9">
      <div class="card-content">
        <div class="card-header">
          <div class="card-title">
            Star Wars: The Last Jedi
            <span class="year">(2017)</span>
          </div>
          <span class="genre">Action, Adventure, Fantasy</span>
        </div>
        <p>
          Rey develops her newly discovered abilities with the guidance of Luke
          Skywalker, who is unsettled by the strength of her powers. Meanwhile,
          the Resistance prepares for battle with the First Order.
        </p>
        <div class="card-action">
          <a class="btn indigo accent-2" href="#" disabled>Edit movie</a>&#8203;
          <button class="btn deep-orange" disabled>Delete movie</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  padding: 0.75em 0.25em;
}
.card .card-content {
  padding: 0.5em;
}
.card .card-content p {
  margin: 1em 0;
}
.card .card-content .card-title {
  margin-bottom: 0;
}
.card .card-content .card-header {
  border-bottom: 1px solid lightgray;
  margin-bottom: 1em;
}
.year {
  font-size: 0.75em;
}
.genre {
  display: block;
  font-size: 1em;
}
</style>
