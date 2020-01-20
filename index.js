var nomes = [];
var div;
var input;
var adicionar;
window.onload = async () => {
   div = document.querySelector('#app');
   adicionar= document.querySelector('#adicionar');
   input = document.querySelector('#input');
  await BuscarApi(`https://uinames.com/api/?region=brazil&&amount=5`,(result)=>{
       result.map(item => nomes.push(item.name));
   });
    ConfiguraElementos();
    Renderiza();
};

function ConfiguraElementos() {
    adicionar.addEventListener('click', () => {
        if (input.value != "") {
            nomes.push(input.value);
            input.value = "";
            Renderiza();
        }
        else {
            document.querySelector('#err').removeAttribute('hidden');
        }
    });
    input.addEventListener('keydown', (e) => {
        if (e.keyCode == 13)
            adicionar.click();
        e.value != "" ?
            document.querySelector('#err').setAttribute('hidden', 'hidden')
            : document.querySelector('#err').removeAttribute('hidden');
    });
}

function Renderiza() {
    div.innerHTML = null;
    nomes.map((item, index) => {
        div.innerHTML += `
        <div class="box">
        <p >${item}</p>
        <button class="remover"><i class="fas fa-trash-alt"></i></button>
        </div>
            `;
    });
    document.querySelectorAll('.remover').forEach((elemento, index) => {
        elemento.indice = index;
        elemento.addEventListener('click', (e) => {
            nomes.splice(e.currentTarget.indice, 1);
            Renderiza();
        })
    })
}

async function BuscarApi(url,callback = (result)=>{ debugger}) {

    await fetch(url, {
        method: 'GET',
    }).then(async response => {
        let reader = response.body.getReader();
        await reader.read().then(saida => {
            var fetched = String.fromCharCode.apply(null, saida.value);
            fetched = decodeURIComponent(escape(fetched));
            fetched = JSON.parse(fetched, {});
            callback(fetched);
        });
    });

}