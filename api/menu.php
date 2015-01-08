<?php

session_start();

if(!isset($_SESSION["user_token"]) || empty($_SESSION["user_token"]) || !isset($_GET["token"]) || empty($_GET["token"])){
	header("HTTP/1.1 403 Forbidden");
	exit;
}

if($_GET["token"] != $_SESSION["user_token"]){
	header("HTTP/1.1 401 Unauthorized");
	header('GetToken: '.$_GET["token"]);
	header('SessionToken: '.$_SESSION["user_token"]);
	exit;
}

sleep(5);

/* Devo montar aqui a estrutura do menu. */

?>[
	{
		"id" : "home",
		"label" : "HOME",
		"icon" : "&#xe220;",
		"subitems" : []
	},
	{
		"id" : "financeiro",
		"label" : "FINANCEIRO",
		"icon" : "&#xe1e1;",
		"subitems" : [
			{
				"id":"contaspagar",
				"label":"CONTAS A PAGAR"
			},
			{
				"id":"contasreceber",
				"label":"CONTAS A RECEBER"
			},
			{
				"id":"notasfiscais",
				"label":"NOTAS FISCAIS"
			},
			{
				"id":"conciliacao",
				"label":"CONCILIAÇÃO BANCÁRIA"
			},
			{
				"id":"bancos",
				"label":"CADASTRO DE BANCOS"
			}
		]
	},
	{
		"id" : "estoque",
		"label" : "ESTOQUE",
		"icon" : "&#xe2b6;",
		"subitems" : [
			{
				"id":"movimantcaoestoque",
				"label":"MOVIMENTAÇÃO DE ESTOQUE"
			},
			{
				"id":"pedidos",
				"label":"PEDIDOS"
			},
			{
				"id":"patrimonio",
				"label":"CONTROLE PATRIMONIAL"
			}
		]
	},
	{
		"id" : "config",
		"label" : "CONFIGURAÇÕES",
		"icon" : "&#xe168;",
		"subitems" : []
	},
	{
		"id" : "develop",
		"label" : "DESENVOLVIMENTO",
		"icon" : "G",
		"subitems" : []
	}
]