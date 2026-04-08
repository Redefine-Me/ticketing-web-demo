import { getClient } from './client';
import type { FormFieldData } from '@/components/forms/FormFieldCard';

export interface EventFormFieldRow {
  id: string;
  event_id: string;
  type: string;
  title: string;
  options: string[];
  required: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all form fields for an event, ordered by order_index.
 */
export async function getEventFormFields(eventId: string): Promise<FormFieldData[]> {
  const { data, error } = await getClient()
    .from('event_form_fields')
    .select('*')
    .eq('event_id', eventId)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('[supabase_lib] getEventFormFields error:', error.message);
    return [];
  }

  return (data as EventFormFieldRow[]).map((row) => ({
    id: row.id,
    type: row.type as FormFieldData['type'],
    title: row.title,
    options: row.options ?? [],
    required: row.required,
  }));
}

/**
 * Save form fields for an event.
 * Replaces all existing fields (delete + insert).
 * Must be called via service role or edge function.
 */
export async function saveEventFormFields(
  eventId: string,
  fields: FormFieldData[]
): Promise<void> {
  const client = getClient();

  // Delete existing fields for this event
  const { error: deleteError } = await client
    .from('event_form_fields')
    .delete()
    .eq('event_id', eventId);

  if (deleteError) {
    throw new Error(`Failed to clear form fields: ${deleteError.message}`);
  }

  if (fields.length === 0) return;

  // Insert new fields
  const rows = fields.map((field, index) => ({
    event_id: eventId,
    type: field.type,
    title: field.title,
    options: field.options,
    required: field.required,
    order_index: index,
  }));

  const { error: insertError } = await client
    .from('event_form_fields')
    .insert(rows);

  if (insertError) {
    throw new Error(`Failed to save form fields: ${insertError.message}`);
  }
}

/**
 * Delete all form fields for an event.
 */
export async function deleteEventFormFields(eventId: string): Promise<void> {
  const { error } = await getClient()
    .from('event_form_fields')
    .delete()
    .eq('event_id', eventId);

  if (error) {
    throw new Error(`Failed to delete form fields: ${error.message}`);
  }
}
