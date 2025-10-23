document.addEventListener("DOMContentLoaded", () => {
  const inputCnpj = document.getElementById("cnpj");
  const btnConsultar = document.getElementById("consultar");

  const razao = document.getElementById("razao");
  const fantasia = document.getElementById("fantasia");
  const atividade = document.getElementById("atividade");
  const endereco = document.getElementById("endereco");
  const municipio = document.getElementById("municipio");
  const uf = document.getElementById("uf");
  const situacao = document.getElementById("situacao");

  // Função principal
  async function consultarCNPJ() {
    const cnpj = inputCnpj.value.replace(/\D/g, ""); // remove caracteres não numéricos

    if (!/^\d{14}$/.test(cnpj)) {
      alert("Por favor, digite um CNPJ válido com 14 números.");
      return;
    }

    try {
      // Chama a API pública Receitaws
      const resposta = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);

      if (!resposta.ok) {
        throw new Error("Erro ao consultar o CNPJ");
      }

      const dados = await resposta.json();

      if (dados.status === "ERROR") {
        alert(dados.message || "CNPJ não encontrado.");
        limparCampos();
        return;
      }

      // Preenche os campos
      razao.textContent = dados.nome || "-";
      fantasia.textContent = dados.fantasia || "-";
      atividade.textContent = dados.atividade_principal?.[0]?.text || "-";
      endereco.textContent = `${dados.logradouro || "-"}, ${dados.numero || ""} ${dados.complemento || ""}`.trim();
      municipio.textContent = dados.municipio || "-";
      uf.textContent = dados.uf || "-";
      situacao.textContent = dados.situacao || "-";

    } catch (erro) {
      console.error(erro);
      alert("Ocorreu um erro ao consultar o CNPJ. Tente novamente mais tarde.");
    }
  }

  // Limpar campos
  function limparCampos() {
    razao.textContent = "-";
    fantasia.textContent = "-";
    atividade.textContent = "-";
    endereco.textContent = "-";
    municipio.textContent = "-";
    uf.textContent = "-";
    situacao.textContent = "-";
  }

  // Eventos
  btnConsultar.addEventListener("click", consultarCNPJ);
  inputCnpj.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      consultarCNPJ();
    }
  });
});
