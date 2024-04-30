document.getElementById('search-button').addEventListener('click', function() {
  var input = document.getElementById('search-input').value;
  var option = document.getElementById('search-options').value;

  var endpoint;
  switch(option) {
      case 'Nombre de plato':
          endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
          break;
      case 'Categoría':
          endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`;
          break;
      case 'Ingrediente principal':
          endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
          break;
      case 'Área':
          endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${input}`;
          break;
  }

  fetch(endpoint)
      .then(response => response.json())
      .then(data => {
          if (data.meals === null) {
              alert('No se encontraron resultados. Por favor, intente con otra búsqueda.');
          } else {
              console.log(data.meals);
          }
      });
});