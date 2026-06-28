(function () {
  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function matchesText(record, query, fields) {
    var term = normalize(query).trim();
    if (!term) return true;
    return fields.some(function (field) {
      return normalize(record[field]).indexOf(term) >= 0;
    });
  }

  window.ProcederFilters = { normalize: normalize, matchesText: matchesText };
})();
