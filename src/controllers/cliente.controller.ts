import { Request, Response } from "express";
import clienteRepository from "../repositories/clienteRepository";
import { Cliente } from '../models/Cliente';
import { Telefone } from '../models/Telefone';
import { Endereco } from '../models/Endereco';
import { validarCPF } from "../utils/validarCpf";
import { limparNumero } from "../utils/limparNumero";
import consultarCep from "../utils/buscarCep";


const clienteController = {
    criar: async (Req: Request, Res: Response) => {
        try {
            let { nomeCliente, sobrenomeCliente, cpf, email, numeroTelefone, tipoTelefone, cep, numeroEndereco, complemento } = Req.body;

            cpf = limparNumero(cpf);
            cep = limparNumero(cep);
            numeroTelefone = limparNumero(numeroTelefone);
            const informacaoEndereco = await consultarCep(cep);

            if (!validarCPF(cpf)) {
                Res.status(400).json({ message: 'CPF inválido.' })
            }

            const cliente = Cliente.criar({ nomeCliente, sobrenomeCliente, cpf, email });
            const telefone = Telefone.criar({
                idCliente: 0,
                tipo: tipoTelefone,
                numero: numeroTelefone
            });
            const endereco = Endereco.criar({
                idCliente: 0,
                cep: cep,
                UF: informacaoEndereco.uf,
                logradouro: informacaoEndereco.logradouro,
                cidade: informacaoEndereco.localidade,
                bairro: informacaoEndereco.bairro,
                numero: numeroEndereco,
                complemento: complemento || informacaoEndereco.complemento
            });

            const result = await clienteRepository.clienteRepository.create(cliente, telefone, endereco);
            return Res.status(201).json({ message: 'Cliente registrado com sucesso!', data: result });
        } catch (error: any) {
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }

    },
    listar: async (Req: Request, Res: Response) => {
        try {
            const { idCliente, nomeCliente } = Req.query;

            const id = idCliente ? Number(idCliente) : undefined;
            const nome = nomeCliente ? String(nomeCliente) : undefined;

            const result = await clienteRepository.clienteRepository.read(nome, id);

            if (result.length === 0) {
                const contexto = id ? `com o id ${id}` : (nome ? `com o nome "${nome}"` : 'cadastrado');
                return Res.status(200).json({
                    message: `Não há nenhum cliente ${contexto} no banco de dados.`,
                    data: []
                });
            }

            return Res.status(200).json({
                message: 'Requisição bem sucedida',
                data: result
            });

        } catch (error: any) {
            return Res.status(500).json({
                message: 'Ocorreu um erro no servidor.',
                error: error.message
            });
        }
    },
    atualizar: async (Req: Request, Res: Response) => { //Fazer com que use os campos antigos
        try {
            const id: number = Number(Req.query.id);
            const { nome, sobrenome, cpf, email } = Req.body;
            const cliente = Cliente.editar({ idCliente: id, nomeCliente:nome, sobrenomeCliente: sobrenome, cpf: cpf, email: email });
            const result = await clienteRepository.clienteRepository.update(cliente);

            if (result.affectedRows === 0) {
                return Res.status(404).json({ message: 'Não há nenhum cliente com esse id no banco de dados.' })
            }
            return Res.status(200).json({ message: 'Atualização bem sucedida', data: result });
        } catch (error: any) {
            return Res.status(500).json({
                message: 'Ocorreu um erro no servidor.',
                error: error.message
            })
        }
    },
    excluir: async (Req: Request, Res: Response) => {
        try {
            const id: number = Number(Req.params.id);
            const result = await clienteRepository.clienteRepository.delete(id);
            return Res.status(200).json({ result });
        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    }
}

const telefoneController = {
    criar: async (Req: Request, Res: Response) => {
        try {

        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    },
    listar: async (Req: Request, Res: Response) => {
        try {

        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    },
    atualizat: async (Req: Request, Res: Response) => {
        try {

        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    },
    excluir: async (Req: Request, Res: Response) => {
        try {
            const id: number = Number(Req.params.id);
            const result = await clienteRepository.telefoneRepository.delete(id);
            return Res.status(200).json({ result });
        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    }
}

const enderecoController = {
    criar: async (Req: Request, Res: Response) => {
        try {

        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    },
    listar: async (Req: Request, Res: Response) => {
        try {

        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    },
    atualizat: async (Req: Request, Res: Response) => {
        try {

        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    },
    excluir: async (Req: Request, Res: Response) => {
        try {
            const id: number = Number(Req.params.id);
            const result = await clienteRepository.enderecoRepository.delete(id);
            return Res.status(200).json({ result });
        } catch (error: any) {
            console.error(error);
            Res.status(500).json({ message: 'Ocorreu um erro no servidor.', error: error.message })
        }
    }
}

export default clienteController;