<?php

function imce_govil_form($form, &$form_state) {
  $form = array();

  $form['imce_govil_group_types'] = array(
    '#type' => 'textfield',
    '#title' => t('Insert group types'),
    '#default_value' => variable_get('imce_govil_group_types', get_group_types()),
  );

  $form['imce_govil_general_dir_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Enter folder name that appear in all the nodes without gid'),
    '#default_value' => variable_get('imce_govil_general_dir_name'),
  );

  $form['imce_govil_delete_dir_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Enter folder name that keeps all the files deleted from IMCE'),
    '#default_value' => variable_get('imce_govil_delete_dir_name'),
  );

  $form['imce_govil_types_with_general_dir'] = array(
    '#type' => 'textfield',
    '#title' => t('Enter content types with general directory'),
    '#default_value' => variable_get('imce_govil_types_with_general_dir'),
  );
  
  // Pass the form array through system_settings_form()
  return system_settings_form($form);
}