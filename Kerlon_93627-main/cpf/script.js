// Espera o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep");
  const consultarBtn = document.getElementById("consultar");

  // Elementos de resultado
  const rua = document.getElementById("rua");
  const bairro = document.getElementById("bairro");
  const cidade = document.getElementById("cidade");
  const estado = document.getElementById("estado");

  // Função para limpar campos
  function limparCampos() {
    rua.textContent = "-";
    bairro.textContent = "-";
    cidade.textContent = "-";
    estado.textContent = "-";
  }

  // Função principal de consulta
  async function consultarCEP() {
    const cep = cepInput.value.trim();

    // Verifica se o CEP tem 8 dígitos numéricos
    if (cep.length !== 8 || isNaN(cep)) {
      alert("Por favor, digite um CEP válido (apenas números, 8 dígitos).");
      limparCampos();
      return;
    }

    try {
      // Consulta a API ViaCEP
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!resposta.ok) {
        throw new Error("Erro ao consultar o CEP");
      }

      const dados = await resposta.json();

      // Verifica se o CEP existe
      if (dados.erro) {
        alert("CEP não encontrado!");
        limparCampos();
        return;
      }

      // Exibe os dados na tela
      rua.textContent = dados.logradouro || "Não informado";
      bairro.textContent = dados.bairro || "Não informado";
      cidade.textContent = dados.localidade || "Não informado";
      estado.textContent = dados.uf || "Não informado";

      // Pequena animação visual ao atualizar os resultados
      document.querySelector(".resultado").style.animation = "fadeIn 0.6s ease";
    } catch (erro) {
      alert("Erro na consulta. Verifique sua conexão e tente novamente.");
      limparCampos();
      console.error(erro);
    }
  }

  // Evento de clique no botão
  consultarBtn.addEventListener("click", consultarCEP);

  // Permite pressionar Enter para consultar
  cepInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      consultarCEP();
    }
  });
});

