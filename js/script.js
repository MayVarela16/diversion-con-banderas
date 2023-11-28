document.addEventListener('DOMContentLoaded', async () => {
        const countriesList = document.getElementById('countries-list');
      
        try {
          const response = await fetch('https://restcountries.com/v3/all');
          const data = await response.json();
          const sortedCountries = data.sort((a, b) =>
            a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase())
          );
      
          displayCountries(sortedCountries, countriesList);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      });
      
      const displayCountries = (countries, container) => {
        countries.forEach(country => {
            const countryCardContainer = document.createElement('div');
            countryCardContainer.classList.add('country-card-container');
        
            const countryDiv = document.createElement('div');
            countryDiv.classList.add('country-card');
            
            const flagSource = country.flags[0];

          countryDiv.innerHTML = `
            <img src="${flagSource}" alt="Bandera" class="country-flag">
            <h2><strong>${country.name.common}</strong></h2>
          `;
      
          countryDiv.querySelector('.country-flag').addEventListener('click', () => {
            showCountryDetails(country);
          });
      
          container.appendChild(countryDiv);
        });
      };
      
      const showCountryDetails = (country) => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
      
        modal.innerHTML = `
        <div class="modal-content">
      <div class="modal-left">
        <img src="${country.flags[0]}" alt="Bandera" class="modal-flag">
      </div>
      <div class="modal-right">
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Población:</strong> ${country.population}</p>
        <p><strong>Lado de la carretera:</strong> ${country.car.side || 'No disponible'}</p>
        <button onclick="closeModal()"><strong>X</strong></button>
      </div>
    </div>
        `;
      
        document.body.appendChild(modal);
      };
      
      function closeModal() {
        
        const modal = document.querySelector('.modal');
        if (modal) {
          modal.parentNode.removeChild(modal);
        }
      }