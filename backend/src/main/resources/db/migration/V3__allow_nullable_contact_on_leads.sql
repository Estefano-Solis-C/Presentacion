-- =============================================================================
-- INSTITUCIÓN EDUCATIVA PRIVADA "DORA MAYER DE ZULEN"
-- V3__allow_nullable_contact_on_leads.sql — Flexibilidad de contacto para apoderados
-- Permite que apoderados que solo cuentan con celular o solo correo no sean bloqueados
-- =============================================================================

ALTER TABLE leads MODIFY celular VARCHAR(20) NULL;
ALTER TABLE leads MODIFY correo VARCHAR(150) NULL;
