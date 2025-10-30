import data from '../data/ph_locations.json';

export function getProvinces() {
  return data;
}

export function getCitiesByProvince(provinceCode) {
  const province = data.find(p => p.code === provinceCode);
  return province ? province.cities : [];
}

export function getBarangaysByCity(provinceCode, cityCode) {
  const province = data.find(p => p.code === provinceCode);
  if (!province) return [];
  const city = province.cities.find(c => c.code === cityCode);
  return city ? city.barangays : [];
}
